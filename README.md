# Discord BOT - Free Udemy courses
![courses](https://github.com/NPeykov/udemy-discord-bot/blob/main/assets/courses-in-channel.gif)

## Introduction
This discord bot is programmed to search for free courses in certain pages that provide discount coupons --up to 100%-- for Udemy and then send them to a specific channel on a Discord server.

Although, the bot only searches for courses on a single page, called [discudemy](https://www.discudemy.com/), it can easily be extended to search on other pages since the code is decoupled from other logic. But, at the moment, there is no need to have multiple courses providers as discudemy offers a wide variety of courses that goes from programming, cybersecurity to photography, Photoshop, and leadership.


## Setting up the bot on our Discord server
1. Firstly, it is necessary to invite the bot to our server, for which you have to follow the steps after clicking on the following link:

    https://discord.com/api/oauth2/authorize?client_id=957750339883397140&permissions=18432&scope=bot

2. Once the previous step is done, the bot should appear in our server's user list.
    From any channel of our server, we must type the following command:
    `!fc_start`

    The bot will send this message as a response:
    
    ![welcome-message](https://github.com/NPeykov/udemy-discord-bot/blob/main/assets/setup-bot.png?raw=true)
    
    In short, we must configure the bot so that it can publish the courses in a certain channel, the available channels are showed in the response message along with a number that identifies them. We will use this number to tell the bot where it should publish the courses using the following command:
    `!fc_setChannel number`
    
3. That's all. Once this is done, all that is left is to wait for the bot execute the course search and, in case it finds any, it will publish them in the defined channel.
    >NOTE: The bot usually finds courses in batches. For that reason, it is recommended to mute the channel, as otherwise, multiple notifications would arrive at the same time, which could be annoying.


