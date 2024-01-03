let embed;

const storedChannel = localStorage.getItem('twitchChannel'),
    storedRecents = localStorage.getItem('twitchRecents');

Alpine.store('video', {
    state: 1
});

const videoCtrl = {
    twitchScriptLoaded: false,
    twitchChannel: storedChannel || 'twitch',
    twitchRecents: (storedRecents && JSON.parse(storedRecents)) || [],
    twitchChannelEntry: '',
    initFn() {
        const self = this;
        spidgets.scriptFromUrl('https://embed.twitch.tv/embed/v1.js', () => {
            self.twitchScriptLoaded = true;
        });
    },
    twitchInit() {
        embed = new Twitch.Embed('twitch-embed', {
            width: '100%',
            height: '100%',
            channel: this.twitchChannel,
            autoplay: false,
            layout: 'video',
            parent: ['localhost', '3rl.io']
        });

        embed.addEventListener(Twitch.Embed.VIDEO_READY, embed.getPlayer().play);
    },
    setTwitchChannel(evt) {
        if (evt){
            evt.preventDefault();
        }
        const player = embed.getPlayer(),
            val = this.twitchChannel = this.twitchChannelEntry;
        player.setChannel(val);
        localStorage.setItem('twitchChannel', val);
        this.twitchRecents.unshift(val);
        this.twitchRecents = this.twitchRecents.slice(0,3);
        localStorage.setItem('twitchRecents', JSON.stringify(this.twitchRecents));
        console.log(this.twitchRecents);
        player.play();
    }
}

