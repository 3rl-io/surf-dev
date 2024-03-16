const urlParams = new URLSearchParams(window.location.search);
let zones = [{template: 'home', hasScript: true, iconCls: 'fas fa-house-chimney'},
    {template: 'video', hasScript: true, toolbarCls: 'solid-toolbar video-toolbar', iconCls: 'fas fa-tv'},
    {template: 'audio', toolbarCls: 'solid-toolbar black-toolbar', iconCls: 'fas fa-headphones'},
    {template: 'discord', toolbarCls: 'solid-toolbar discord-toolbar', iconCls: 'fab fa-discord'},
    {template: 'finance', iconCls: 'fas fa-dollar-sign'}];

const appCtrl = {
    offset: urlParams.get('offset') || 0,
    background: urlParams.get('bg') || 'assets/backgrounds/polarcity.jpg',
    zones,
    activeZone: 0,
    dimmerLevel: 0,
    cycleDimmer() {
        this.dimmerLevel = (this.dimmerLevel + 1) % 4
    },
    activateZone(evt) {
        this.activeZone = evt.detail;
    },
    goToZone(index) {
        if (index === this.activeZone && Alpine.store('video')) {
            Alpine.store('video').state = 1;
        }
        spidgets.goToZone(index);
    }
}