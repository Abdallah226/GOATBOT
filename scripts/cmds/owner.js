const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: 'ᎯᏰᎠᎯᏝᏝᎯᎻ',
      choise: 'Only ᏰᏬᏒᏦᎨᏁᎯᏰé',
      habit: 'Playing 𝐧𝐞𝐨 𝐦𝐨𝐧𝐬𝐭𝐞𝐫𝐬 🔥',
      gender: 'Male',
      age: '16+',
      height: '_hat 🐸🤠',
      facebookLink: 'https://www.facebook.com/profile.php?id=61563580892213',
      nick: '𝐀𝐜𝐤𝐞𝐫𝐦𝐚𝐧'
    };

    const bold = 'https://i.imgur.com/LbneO8C.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `╭────────────◊
├‣Oᴡɴᴇʀ Iɴғᴏʀᴍᴀᴛɪᴏɴ 📃
├───────────◊
├‣ Nᴀᴍᴇ: ${ownerInfo.name}
├‣ Cʜᴏɪsᴇ: ${ownerInfo.choise}
├‣ Hᴀʙɪᴛ: ${ownerInfo.habit}
├‣ Gᴇɴᴅᴇʀ:  ${ownerInfo.gender}
├‣ Aɢᴇ:  ${ownerInfo.age}
├‣ Hᴇɪɢʜᴛ: ${ownerInfo.height}
├‣ Fᴀᴄᴇʙᴏᴏᴋ:  ${ownerInfo.facebookLink}
├‣ Nɪᴄᴋ: ${ownerInfo.nick}   
╰───────────◊`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
