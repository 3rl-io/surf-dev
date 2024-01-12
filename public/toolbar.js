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
        this.date = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale).format(date);
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
    searchRef: null,
    init(){

        const self = this;
        document.addEventListener("visibilitychange",() => {
            if (!self.searchRef) return;
            if (document.hidden) {
                self.searchRef.blur();
            }  else {
                self.searchRef.focus();
                self.searchIsOpen = true;
            }
        })
    },
    submitSearch(evt) {
        if (this.searchText) {
            window.open('http://www.google.com/search?q=' + encodeURIComponent(this.searchText), '_blank');

            this.searchText = '';
        }
        this.searchRef.blur();
        evt.preventDefault();

    }
})