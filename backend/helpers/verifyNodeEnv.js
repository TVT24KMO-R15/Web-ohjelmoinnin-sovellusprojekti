export const verifyNodeEnv = () => {
  before(async function () {
    const res = await fetch(`http://localhost:${process.env.PORT}/__env`);
    const data = await res.json();
    console.log("Current NODE_ENV:", data);
    if (data.env !== "test") {
      console.warn("WARNING: Backend not in test mode. Abort tests.");
      process.exit(1);
    }
  });
};
