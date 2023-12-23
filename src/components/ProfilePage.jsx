import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const renderData = (item) => {
    if (typeof item === "object" && item !== null) {
      return (
        <div className="pl-[1em]">
          {Object.entries(item).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return (
                <div key={key}>
                  <div className="text-white font-bold w-min flex items-end rounded my-[.7em] bg-[#333333] py-[.4em] px-[.7em]">
                    <p className="pr-[.3em]">{key}</p>
                    <IoMdArrowDropdown />
                  </div>{" "}
                  {renderData(value)}
                </div>
              );
            } else {
              return (
                <div key={key} className="">
                  <strong>{key} </strong> {renderData(value)}
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <span className="text-[#625bf7] pl-[.4em] font-bold">{item}</span>;
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    fetch(`https://dummyjson.com/users/${data.id}`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((res) => {
        res.json().then((error) => {
          switch (res.status) {
            case 400:
              setErrorMsg(error.message);
              break;
            default:
              setErrorMsg("Unknown Error Occured");
          }
        });
      });
  }, []);

  return (
    <main className="bg-[#f5f5f5]">
      <div className="w-[95%] max-w-[900px] bg-white my-[2em] py-[1.5em] mx-auto rounded">
        <div className="text-3xl text-center font-extrabold">User Profile</div>
        {userInfo && renderData(userInfo)}
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    </main>
  );
}
