const appCtrl = {
    background: 'assets/backgrounds/polarcity.jpg',
    zones: [
        {template: 'home', hasScript: true, iconCls: 'fas fa-house-chimney'},
        {template: 'video', hasScript: true, toolbarCls: 'solid-toolbar video-toolbar', iconCls: 'fas fa-tv'},
        {template: 'audio', toolbarCls: 'solid-toolbar audio-toolbar', iconCls: 'fas fa-headphones'},
        {template: 'finance', iconCls: 'fas fa-dollar-sign'},
        null,
        null
    ],
    activeZone: 0,
    dimmerLevel: 0,
    cycleDimmer() {
        this.dimmerLevel = (this.dimmerLevel + 1) % 4
    },
    goToZone(index) {
        if (index === 1 && this.activeZone === 1 && Alpine.store('video')) {
            Alpine.store('video').state = 1;
        }
        spidgets.goToZone(index);
    }
}