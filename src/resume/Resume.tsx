import { useState } from "react";

export function Resume() {
   const [authStage, setAuthStage] = useState("unauthenticated");
   const [code, setCode] = useState("");
   const [remember, setRemember] = useState(false);
   const [error, setError] = useState(null);

   async function handleSubmit(e) {
      e.preventDefault();
      setError(null);

      if (authStage == "unauthenticated") {
         setAuthStage("verifying-code");
         await fetch('/api/resume/send-otp', { method: "POST" });
         setAuthStage("awaiting-input");
         return;
      }

      if (authStage == "awaiting-input") {
         setAuthStage("verifying-code");
         const res = await fetch('/api/resume/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, remember }),
         });
         if (res.ok) {
            setAuthStage("authenticated");
         } else {
            setAuthStage("awaiting-input");
            setError("Invalid code.");
         }
      }
   }

   function handleResend() {
      fetch('/api/resume/send-otp', { method: "POST" });
   }

   if (authStage == "authenticated") {
      return <p>Logged in.</p>;
   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            {authStage == "unauthenticated" &&
               <button type="submit">Login</button>
            }
            {authStage == "awaiting-input" &&
               <>
                  <input
                     type="text"
                     autoCapitalize="true"
                     placeholder="XXXXXX"
                     maxLength={6}
                     minLength={6}
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                  />
                  <label>
                     <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                     />
                     Remember this device
                  </label>
                  <button type="button" onClick={handleResend}>Resend Code</button>
                  <button type="submit">Verify</button>
               </>
            }
            {authStage == "verifying-code" &&
               <h4>Loading...</h4>
            }
         </form>
         {error && <p role="alert">{error}</p>}
      </>
   );
}
