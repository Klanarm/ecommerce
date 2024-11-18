// .trace(async ({ error, request, afterHandle, ...set }) => {
//   try {
//     const { time: timeRequest } = await request; // Remove await here
//     const { children: errorChild, skip: skipError } = await error; // Remove await here
//     for (const childError of errorChild) {
//       const { time: start, end } = await childError; // Remove await here
//       const endTime = await end; // Await only necessary parts
//       console.log("took", endTime - timeRequest, "ms");
//     }
//   } catch (err) {
//     console.error("Error during tracing:", err);
//   }
// })
// .use(
//   basicAuth({
//     credentials: { env: "MY_CREDENTIALS" },
//     scope: "/api/v1",
//   })
// )
