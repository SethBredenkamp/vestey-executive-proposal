export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      clientName = 'Unknown Signatory',
      clientTitle = 'Commercial Director',
      clientEmail = 'Not provided',
      totalGBP = 2750,
      totalZAR = 60000,
      commandCenterEnabled = true,
      timestamp = new Date().toISOString()
    } = body;

    // Detect Client IP and Geo-location from Vercel Edge Headers
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (req.headers['x-real-ip'] || req.socket?.remoteAddress || 'Unknown IP');
    const country = (req.headers['x-vercel-ip-country'] || 'UNKNOWN').toString().toUpperCase();
    const city = (req.headers['x-vercel-ip-city'] || 'Unknown City').toString();
    const region = (req.headers['x-vercel-ip-country-region'] || '').toString();
    const userAgent = req.headers['user-agent'] || 'Unknown Device';

    const isUK = country === 'GB' || country === 'UK';
    const isSA = country === 'ZA';
    const isExternalClient = !isSA; // Not Seth / South African team testing

    const statusBadge = isUK
      ? '🇬🇧 VERIFIED UK CLIENT SIGNATURE (Surrey / UK)'
      : isExternalClient
      ? `🌍 EXTERNAL CLIENT SIGNATURE (${country})`
      : '🇿🇦 INTERNAL / TEAM TESTING SIGNATURE (South Africa)';

    const emailSubject = isUK
      ? `🚨 [VESTEY CONTRACT SIGNED] Official UK Client Signature Detected (${city || 'Surrey'}, UK)`
      : isExternalClient
      ? `🚨 [VESTEY CONTRACT SIGNED] External Signature (${country} - ${city})`
      : `⚠️ [TEST SIGNATURE] Signed from South Africa (${clientIp})`;

    const notifyPayload = {
      _subject: emailSubject,
      _template: 'table',
      status: statusBadge,
      is_foreign_ip: isExternalClient ? 'YES - Non-SA IP (Likely Vestey Foods Client)' : 'NO - South African IP (Team Testing)',
      client_name: clientName,
      client_title: clientTitle,
      client_email: clientEmail,
      scope_total_gbp: `£${Number(totalGBP).toLocaleString()} GBP`,
      scope_total_zar: `R${Number(totalZAR).toLocaleString()} ZAR`,
      command_center_selected: commandCenterEnabled ? 'YES (£1,150 Add-On Included)' : 'NO (Base Scope Only)',
      client_ip: clientIp,
      geo_country: country,
      geo_city: city,
      geo_region: region,
      signed_timestamp: timestamp,
      user_agent: userAgent,
      portal_url: 'https://vestey.codekings.dev'
    };

    // Dispatch notification to Seth Bredenkamp
    const response = await fetch('https://formsubmit.co/ajax/sethbredenkamp@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://vestey.codekings.dev/',
        'Origin': 'https://vestey.codekings.dev'
      },
      body: JSON.stringify(notifyPayload)
    });

    const result = await response.json().catch(() => ({}));

    console.log('[VESTEY_SIGNATURE_EVENT]', {
      clientIp,
      country,
      city,
      isExternalClient,
      clientName,
      totalGBP,
      result
    });

    return res.status(200).json({
      success: true,
      clientIp,
      country,
      city,
      isExternalClient,
      notified: true
    });
  } catch (error) {
    console.error('Failed to notify signed proposal:', error);
    return res.status(500).json({ error: error.message || 'Internal notification error' });
  }
}
