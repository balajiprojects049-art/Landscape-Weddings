import { Resend } from 'resend';

// NOTE: You'll need to set your RESEND_API_KEY in Vercel environment variables or .env
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { pdfBase64, clientName, totalAmount, details } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'Landscape Weddings <onboarding@resend.dev>', // You can customize this later with your own domain
            to: ['info@landscapephotography.in'], // The Admin email
            subject: `New Quote Request: ${clientName} - Rs. ${totalAmount}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #c19b41;">New Quote Inquiry From Website</h2>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Total Estimate:</strong> Rs. ${totalAmount}</p>
          <hr />
          <p><strong>Details:</strong></p>
          <pre>${details}</pre>
          <p>The full PDF quote is attached to this email.</p>
        </div>
      `,
            attachments: [
                {
                    filename: `Quote_${clientName.replace(/\s+/g, '_')}.pdf`,
                    content: pdfBase64,
                },
            ],
        });

        return res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: error.message });
    }
}
