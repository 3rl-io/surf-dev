const toolbarCtrl = {
    time: '', date: '', isFullscreen: false,
    setDateTime() {
        const date = new Date(),
            rawHours = date.getHours(),
            hours = (rawHours % 12) || 12,
            rawMinutes = date.getMinutes(),
            minutes = rawMinutes < 10 ? '0'+rawMinutes : rawMinutes,
            ampm = rawHours >= 12 ? 'PM' : 'AM';

        this.time = `${hours}:${minutes} ${ampm}`;
        this.date = (date.getMonth()+1) + "/" + date.getDate() + "/" + (date.getFullYear() % 100);
    },
    initFn() {
        const self = this;
        self.setDateTime();
        setInterval(() => {self.setDateTime()}, 2000);

        document.addEventListener("fullscreenchange", () => {
            this.isFullscreen = !!document.fullscreenElement;
        });
    },
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};

Alpine.store('toolbar', {
    searchText: '',
    searchIsOpen: false,
    submitSearch(evt) {
        window.open('http://www.google.com/search?q=' + encodeURIComponent(this.searchText), '_blank');

        this.searchText = '';
        evt.preventDefault();
    }
})