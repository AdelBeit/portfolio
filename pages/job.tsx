import {useEffect, useRef, useState} from "react";
import {templates} from "../src/data/templates/cold_emails";

const EmailGenerator = ({
  firstName,
  lastName,
  domain,
  emails,
  onTextChange,
  copyToClipboard,
}: {
  firstName: string;
  lastName: string;
  domain: string;
  emails: string;
  onTextChange: Function;
  copyToClipboard: Function;
}) => {
  const ref = useRef(null);

  function handleClick() {
    const node = ref.current;
    if (node) {
      node.style.animation = "none";
      void node.offsetWidth;
      node.style.animation = "";
    }
    copyToClipboard(emails);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    onTextChange(e.target.id, e.target.value);
  }

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-full">
        <input
          className="input input-bordered"
          onChange={handleTextChange}
          id="firstName"
          type="text"
          placeholder="first name"
          value={firstName}
        />
        <input
          className="input input-bordered"
          onChange={handleTextChange}
          id="lastName"
          type="text"
          placeholder="last name"
          value={lastName}
        />
        <input
          className="input input-bordered"
          onChange={handleTextChange}
          id="domain"
          type="text"
          placeholder="domain.com"
          value={domain}
        />
      </div>
      <span
        ref={ref}
        className="flash-animation textarea textarea-bordered w-full"
        id="email-list"
        role={"textbox"}
        onClick={handleClick}>
        {emails}
      </span>
    </div>
  );
};

const MessageGenerator = ({
  copyToClipboard,
  onTextChange,
  message,
  company
}: {
  copyToClipboard: Function;
  message: string;
  company: string;
  onTextChange: Function;
}) => {
  const ref = useRef(null);

  function handleClick() {
    const node = ref.current;
    if (node) {
      node.style.animation = "none";
      void node.offsetWidth;
      node.style.animation = "";
    }
    copyToClipboard(message);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    onTextChange(e.target.id, e.target.value);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        className="input input-bordered"
        onChange={handleTextChange}
        id="company"
        type="text"
        placeholder="company"
        value={company}
      />
      <span
        ref={ref}
        className="flash-animation textarea textarea-bordered"
        id="email-message"
        role={"textbox"}
        contentEditable
        onClick={handleClick}>
        {message}
      </span>
    </div>
  );
};

function App() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [emails, setEmails] = useState(getEmails());
  const [message, setMessage] = useState<string>(templates.apply('early_career',{'name':`John Doe`, 'company':!!company ? company : '{{company}}'}));

  const handleTextChange = (id: string, value: string) => {
    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "lastName") {
      setLastName(value);
    } else if (id === "domain") {
      setDomain(value);
    } else if (id === "company") {
      setCompany(value);
    }
  };

  const copyToClipboard = (emails) => {
    const text = emails;
    navigator.clipboard.writeText(text).then(
      () => {},
      (err) => alert(`Failed to copy text: ${err}`)
    );
  };

  function getEmails() {
    const FN = firstName || "first";
    const LN = lastName || "last";
    const D = domain || "domain.com";
    const emails = [
      `${FN.charAt(0)}${LN}@${D}`,
      `${FN}${LN.charAt(0)}@${D}`,
      `${FN}@${D}`,
      `${LN}@${D}`,
      `${FN}${LN}@${D}`,
      `${FN}.${LN}@${D}`,
      `${FN.charAt(0)}.${LN}@${D}`,
      `${FN}${LN}1@${D}`,
      `${FN.charAt(0)}${LN}1@${D}`,
      `${FN}-${LN}@${D}`,
      `${FN}_${LN}@${D}`,
      `${LN}${FN.charAt(0)}@${D}`,
      `${LN}${FN}@${D}`,
      `${LN}.${FN}@${D}`,
      `${LN.charAt(0)}${FN}@${D}`,
      `${FN}_${LN.charAt(0)}@${D}`,
    ];
    return emails.join(",\n");
  }

  useEffect(() => {
    setEmails(getEmails());
  }, [firstName, lastName, domain]);
  
  useEffect(() => {
    const FN = firstName || "{{first}}";
    const LN = lastName || "{{last}}";
    setMessage(templates.apply('early_career',{'name':`${FN} ${LN}`, 'company':!!company ? company : '{{company}}'}));
  }, [firstName, lastName, company]);
  

  return (
    <div data-theme="retro" className="w-full h-full overflow-y-scroll">
      <div className="flex flex-col justify-center items-center gap-5 my-5">
        <div className="card card-normal card-bordered w-2/3">
          <div className="card-body">
            <h2 className="card-title">Email Generator</h2>
            <EmailGenerator
              firstName={firstName}
              lastName={lastName}
              domain={domain}
              emails={emails}
              copyToClipboard={copyToClipboard}
              onTextChange={handleTextChange}
            />
          </div>
        </div>
        <div className="card card-normal card-bordered w-2/3">
          <div className="card-body">
            <h2 className="card-title">Message Generator</h2>
            <MessageGenerator message={message} company={company} copyToClipboard={copyToClipboard} onTextChange={handleTextChange}/>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes flashBorder {
          0%,
          100% {
            border-color: default;
          }
          50% {
            border-color: green;
          }
        }

        .flash-animation {
          animation: flashBorder 1s 1;
        }
      `}</style>
    </div>
  );
}

export default App;

// extensions
// TODO: wire up email sending feature
// TODO: add bulk email sending feature