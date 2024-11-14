// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { captchaToken } = await req.json();

//     const response = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
//       {
//         method: 'POST',
//       }
//     );

//     const data = await response.json();

//     if (data.success) {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ success: false, message: 'Invalid captcha' }, { status: 400 });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }