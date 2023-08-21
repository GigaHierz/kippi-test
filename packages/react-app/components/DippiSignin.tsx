import React, { useEffect, useState } from "react";
const Dippi = require("@dippixyz/sdk");

function DippiSignin() {
  const DippiClient = new Dippi({
    appToken: process.env.DIPPI_API_TOKEN,
    appId: process.env.DIPPI_APPLICATION_ID,
    url: process.env.DIPPI_URL,
    urlReturn: "http://localhost:3002/dippi",
  });

  const initClientDippi = async () => {
    const { accessToken } = await DippiClient.auth.login();
    DippiClient.setAuthToken(accessToken);
  };

  const openIframeDippi = async () => {
    await initClientDippi();
    const { url } = await DippiClient.auth.getUrl();
    const left = (window.innerWidth - 500) / 2;
    const top = (window.innerHeight - 650) / 2;
    const options = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,width=500,height=650,top=${top},left=${left}`;
    window.open(url, "childWindow", options);
    localStorage.removeItem("registration_complete");
  };

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      const registration_complete = localStorage.getItem(
        "registration_complete"
      );

      if (
        event.data.type == "registration_complete" &&
        !registration_complete &&
        event.origin == "https://client.dippi.xyz"
      ) {
        // Verify that the origin of the event is from our official site.
        // Save in local storage registration_complete = true
        localStorage.setItem("registration_complete", "true");

        const { redirectUrl, userId, walletAddress } = event.data;
        await getUser(userId);
      }
    });
  });

  const getUser = async (userId: string) => {
    await initClientDippi();
    const user = await DippiClient.user.getProfile(userId);
    console.log("user :::: >>>", user);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          borderColor: "white",
          margin: 4,
          padding: "5px 20px 5px 20px",
          border: 1,
          boxShadow: "1px 2px 4px grey",
        }}
        onClick={openIframeDippi}
      >
        <img
          src="https://client.dippi.xyz/assets/img/logo.png"
          alt="Dippi Icon"
          style={{ width: 30, marginRight: 4 }}
        />
        <span>
          <strong>Continue with Dippi</strong>
        </span>
      </button>
    </div>
  );
}

export default DippiSignin;
