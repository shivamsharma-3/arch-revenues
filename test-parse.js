const rawText = `Subject: softsphere technologies' broad service description

Hi,

softsphere technologies describes itself broadly as offering website development, ecommerce, and web applications in ghaziabad.

that kind of broad positioning often means competing on price, rather than expertise, to win any project that comes along.

cold email and linkedin outbound let you define and target the specific type of client willing to pay for your specialized solutions.

last month, we helped three dev shops refine their ICP and booked 31 discovery calls for them.

worth exploring how an ICP-focused outbound strategy could shift the types of clients you attract?

Shivam
ARCH Revenues

SUBJECT: softsphere technologies' broad service description

Hi,

softsphere technologies describes itself broadly as offering website development, ecommerce, and web applications in ghaziabad.`;

function parseEmailResponse(rawText) {
  let subject = '';
  // Cut off everything after the second "SUBJECT:" (case-insensitive)
  const firstBlock = rawText.split(/\nsubject:/i)[0].trim();
  
  let body = firstBlock;

  const subjectMatch = firstBlock.match(/SUBJECT:\s*(.*?)\nBODY:\s*([\s\S]*)/i);
  if (subjectMatch) {
    subject = subjectMatch[1].trim();
    body = subjectMatch[2].trim();
  } else if (firstBlock.toLowerCase().startsWith('subject:')) {
    // If "BODY:" is missing, we try splitting by "Body:", or if not, split by first blank line or newline
    const parts = firstBlock.split(/body:/i);
    if (parts.length > 1) {
      subject = parts[0].replace(/subject:/i, '').trim();
      body = parts[1].trim();
    } else {
      // Split by newline
      const lines = firstBlock.split('\n');
      subject = lines[0].replace(/subject:/i, '').trim();
      body = lines.slice(1).join('\n').trim();
    }
  }

  return { subject, body };
}

console.log(parseEmailResponse(rawText));
