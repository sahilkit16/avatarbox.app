export const signIn = (user) => {
  return new Promise((resolve, reject) => {
    fetch("/home/sign-in", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      if (res.ok) {
        resolve(true);
      } else {
        const message = await res.text();
        reject(message || res.statusText);
      }
    });
  });
};
