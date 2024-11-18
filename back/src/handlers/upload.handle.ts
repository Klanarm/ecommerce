import otpGenerator from "otp-generator";
import path from "path";
import moment from "moment";

export const uploadHandler = {
  uploadFile: async ({ body }) => {
    const blob = new Blob([body.upload]);
    const arr = new Uint8Array(await blob.arrayBuffer());
    const filename_generator = otpGenerator.generate(6, {
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: false,
    });
    const unixTime = moment().unix();
    const filename = `${filename_generator}_${unixTime}.${
      body.upload.type.split("/")[1]
    }`;
    const filepath = path.join(__dirname, "../../public", filename);
    await Bun.write(filepath, arr);
    return `${process.env.HOST_SERVER}${process.env.APP_PREFIX}/upload/${filename}`;
  },
};
