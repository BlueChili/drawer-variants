import type { Alpine } from "alpinejs";

enum Variant {
    undefined,
    LOCK_SCROLL = 'lock',
    INLINE = 'inline',
}

type dataProps = {
    overlayDrawer: boolean;
    inlineDrawer: boolean;
    lockDrawer: boolean; 
    open: boolean;
    expanded: boolean;
    lockedOverlay: () => void;
    toggle: (variant: Variant) => void;
};

export default (Alpine: Alpine) => {
    Alpine.data(
        "drawer",
        (): dataProps => ({
            overlayDrawer: true,
            inlineDrawer: false,
            lockDrawer: false,
            open: false,
            expanded: false,

            lockedOverlay() {},

            toggle(variant) {
                this.open = !this.open;
                this.overlayDrawer = this.open;
                this.inlineDrawer = false;
                this.lockDrawer = false;
                if (!this.open) {
                    this.expanded = false;
                    document.body.classList.remove('overflow-hidden');
                }
                if (this.open && variant === 'lock') {
                    document.body.classList.add('overflow-hidden');
                }
            },
        })
    );
};
