import type { Alpine } from "alpinejs";

type dataProps = {
    overlayDrawer: boolean;
    inlineDrawer: boolean;
    lockDrawer: boolean; 
    open: boolean;
    lockedOverlay: () => void;
    toggle: () => void;
};

export default (Alpine: Alpine) => {
    Alpine.data(
        "drawer",
        (): dataProps => ({
            overlayDrawer: false,
            inlineDrawer: false,
            lockDrawer: false,
            open: false,

            lockedOverlay() {},

            toggle() {
                this.open = !this.open;
                this.overlayDrawer = this.open;
                this.inlineDrawer = false;
                this.lockDrawer = false;
            },
        })
    );
};
