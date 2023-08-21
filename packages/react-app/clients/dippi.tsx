const Dippi = require("@dippixyz/sdk");

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

export { openIframeDippi, initClientDippi, DippiClient };
