import DiscordJS, { IntentsBitField, PermissionFlagsBits, ChannelType, Activity, ActivityType  } from'discord.js'
import dotenv from 'dotenv'
dotenv.config()
import * as fs from 'fs'


const client = new DiscordJS.Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
})

client.on('ready', () => {  
  console.log('The bot is ready')



  setInterval(() => {
    const coun = client.guilds.cache.get('936094927601954837').memberCount
    const coun2 = 100000-coun
    const activities = [
      `${coun.toLocaleString()} members 📗`, `${coun2.toLocaleString()} to 100k! 📗`
    ]
    const status = activities[Math.floor(Math.random() * activities.length)]
    client.user.setPresence({activities: [{ name: `${status}`, type: ActivityType.Watching}]})
  }, 10000)



  const guildId = '936094927601954837' // Use your own guild ID
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create({
    name: 'find',
    description: 'Find a study partner',
    options: [
      {
          name: "subject",
          description: "Choose a subject or grade to find a parter for.",
          type: 3,
          required: true,
          choices: [
              {
                  name: "Any Subject",
                  value: "0000"
              },
              {
                  name: "Math",
                  value: "0001"
              },
              {
                  name: "Physics",
                  value: "0002"
              },
              {
                  name: "Chemistry",
                  value: "0003"
              },
              {
                name: "Biology",
                value: "0004"
              },
              {
                name: "Literature",
                value: "0005"
              },
              {
                name: "Technology",
                value: "0006"
              },
              {
                name: "History",
                value: "0007"
              },
              {
                name: "Geography",
                value: "0008"
              },
              {
                name: "Grade 9 General",
                value: "0009"
              },
              {
                name: "Grade 10 General",
                value: "00010"
              },
              {
                name: "Grade 11 General",
                value: "0011"
              },
              {
                name: "Grade 12 General",
                value: "0012"
              }

          ]
      }
  ]
  })
  commands?.create({
    name: 'leave',
    description: 'Leave the queue/team',
  })
  commands?.create({
    name: 'help',
    description: 'View all the commands and how to use them.',
  })

})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName, options } = interaction

  if (commandName === 'find') {
    if(!fs.readFileSync("teams.json").includes(interaction.user.id)) { 
    if (!fs.readFileSync("queue.json").includes(interaction.user.id)) { // if user didn't use command before and nobody matched
      // if user doesnt have a team
        if (fs.readFileSync("queue.json").includes(interaction.options.get("subject").value)) { // if someone picked the same topic before
          var amo = fs.readFileSync("queue.json")
          var aaa = JSON.parse(amo)
          var found = aaa.stuff.find(item => item.includes(interaction.options.get("subject").value))
          interaction.reply({
            content: 'You have been added to a team with <@' + found.slice(0, 18) + '>. Good luck!',
            ephemeral: false,
          })
          aaa = JSON.stringify(aaa)
          aaa = aaa.replace(found, 'gone')
          aaa = aaa.replace(interaction.user.id, 'gone')
          aaa = JSON.stringify(aaa)
          aaa = JSON.parse(aaa)
          fs.writeFileSync('queue.json', aaa)

          let ea = fs.readFileSync("teams.json")
          var fileo = JSON.parse(ea)
          fileo = JSON.stringify(fileo)
          console.log(fileo)
          fileo = fileo.match(/\d/g);
          fileo = fileo.join("");
          fileo = fileo.match(/.{1,22}/g)
          console.log(fileo)
          console.log(fileo)
    
          let usid = interaction.user.id + found.slice(0, 18)
    
          var amogus = JSON.stringify(usid) 
          var amogus2 = JSON.stringify(fileo)
          amogus2 = amogus2.replace("[", "")
          amogus2 = amogus2.replace("]", "")
          fs.writeFileSync('teams.json', '{"stuff": [' + amogus + ", " + amogus2 + "]}")
          var u2id = found.slice(0, 18)
          const user2 = await client.users.fetch(u2id);
          console.log(u2id)
          interaction.guild.channels.create({
            name: interaction.user.id + u2id,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: client.user.id,
                allow: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: u2id,
                allow: [PermissionFlagsBits.ViewChannel],
              },
            ],
            });
        }
        else {
        try{
        interaction.reply({
          content: 'You have been added to the queue! You will be notified when you match with someone.',
          ephemeral: false,
        })
        
        let ee = fs.readFileSync("queue.json")
        var filea = JSON.parse(ee)
        filea = JSON.stringify(filea)
        console.log(filea)
        filea = filea.match(/\d/g);
        filea = filea.join("");
        filea = filea.match(/.{1,22}/g)
        console.log(filea)
        console.log(filea)

        let usid = interaction.user.id + interaction.options.get("subject").value 

        var amogus = JSON.stringify(usid) 
        var amogus2 = JSON.stringify(filea)
        amogus2 = amogus2.replace("[", "")
        amogus2 = amogus2.replace("]", "")
        fs.writeFileSync('queue.json', '{"stuff": [' + amogus + ", " + amogus2 + "]}")
      }
      catch(err) {
        console.log(err)
      }
    }
    }
  else { // if user is already in the queue
    interaction.reply({
      content: 'You are already in the queue! To leave the queue, type /leave',
      ephemeral: false,
    })
  }
}
  else{
    interaction.reply({
      content: 'You are already in a team! To leave your current team, type /leave',
      ephemeral: false,
    })
  }

  }


  if (commandName === 'leave') {
    if(fs.readFileSync("teams.json").includes(interaction.user.id)) {  // if user has a team
      var amo = fs.readFileSync("teams.json")
      var aaa = JSON.parse(amo)

      

      var found = aaa.stuff.find(item => item.includes(interaction.user.id))
      const chan = client.channels.cache.find(channel => channel.name === found)
      var arr = []
      var e = null
      await chan.messages.fetch({ limit: 100 }).then(messages => {
        console.log(`Received ${messages.size} messages`);
        e = messages
        //Iterate through the messages here with the variable "messages".
        messages.forEach(message => {
        var me = message.createdTimestamp
        me = me.toString()
        console.log(me)
        var a = new Date(Number(me))
        arr.push(a.toISOString() + "   " + message.author.username + "(" + message.author.id + ")" + ": " + message.content)
        console.log(message.content)
      })
      })
      fs.writeFileSync(`${found}.json`, JSON.stringify(arr))
      client.channels.cache.get('1069950961558224927').send({content: `Team closed.\nMembers: ${found.slice(0,18)}, ${found.slice(18,37)}\nChannel ID: ${chan.id}`, files: [`${found}.json`]}).catch((err) => {
        console.log("Error during Export File " + err);
   });;
      console.log(e)
      chan.delete()
      aaa = JSON.stringify(aaa)
      aaa = aaa.replace(found, 'gone')
      aaa = aaa.replace(interaction.user.id, 'gone')
      aaa = JSON.stringify(aaa)
      aaa = JSON.parse(aaa)
      fs.writeFileSync('teams.json', aaa)
      interaction.reply({
        content: 'The team has been closed.',
        ephemeral: false,
      })
    }
    else if (fs.readFileSync("queue.json").includes(interaction.user.id)) {

      var amo = fs.readFileSync("queue.json")
      var aaa = JSON.parse(amo)
      var found = aaa.stuff.find(item => item.includes(interaction.user.id))
      aaa = JSON.stringify(aaa)
      aaa = aaa.replace(found, 'gone')
      aaa = aaa.replace(interaction.user.id, 'gone')
      aaa = JSON.stringify(aaa)
      aaa = JSON.parse(aaa)
      fs.writeFileSync('queue.json', aaa)
      interaction.reply({
        content: 'You have been removed from the queue.',
        ephemeral: false,
      })


    }
    else{
      interaction.reply({
        content: 'You are not in a team or in the queue!',
        ephemeral: false,
      })
    }
  }

  if (commandName === "help") {
    interaction.reply({
      content: '`/leave`: Leave the queue or sever the current team.\n`/find <subject>`: Find a study partner for the chosen topic.',
      ephemeral: false,
    })
  }


})





client.login(process.env.TOKEN)