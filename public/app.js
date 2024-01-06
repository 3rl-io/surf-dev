let zones = null;
if (isProd) {
    zones = [
        {template: 'home', hasScript: true, iconCls: 'fas fa-house-chimney'},
        {template: 'finance', iconCls: 'fas fa-dollar-sign'},
        null, null, null, null];
} else {
    zones = [
        {template: '', hasScript: true, iconCls: 'fas fa-house-chimney'},
        {template: 'video', hasScript: true, toolbarCls: 'solid-toolbar video-toolbar', iconCls: 'fas fa-tv'},
        {template: 'audio', toolbarCls: 'solid-toolbar black-toolbar', iconCls: 'fas fa-headphones'},
        {template: 'finance', iconCls: 'fas fa-dollar-sign'},
        null, null];
}


const urlParams = new URLSearchParams(window.location.search),
    bg = urlParams.get('bg');

const appCtrl = {
    background: bg || 'assets/backgrounds/newmiami.jpg',
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