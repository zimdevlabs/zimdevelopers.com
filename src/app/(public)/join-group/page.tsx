"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Give analytics time to load and execute
    const timer = setTimeout(() => {
      router.push("https://chat.whatsapp.com/FfXS39iLv7k36jrskKjOfX");
    }, 500); // Adjust timeout as needed

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Script id="twitter-pixel" strategy="beforeInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','ppauh');
        `}
      </Script>
      <div>Redirecting...</div>
    </>
  );
}
