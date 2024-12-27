import type { Alpine } from "alpinejs";

enum Variant {
    undefined,
    SCROLL = "scroll",
    INLINE = "inline",
}

type ToggleProps = {
    url: URL["href"];
    variant: Variant;
    expanded?: boolean;
    mainContentUrl: URL["href"];
};

type dataProps = {
    open: boolean;
    loading: boolean;
    expanded: boolean;
    mainContent: string;
    inlineDrawer: boolean;
    remoteContent: null | string;
    mainContentUrl: undefined | string;
    toggle: (options: ToggleProps) => void;
};

export default (Alpine: Alpine) => {
    Alpine.data(
        "drawer",
        (): dataProps => ({
            open: false,
            loading: false,
            expanded: false,
            mainContent: '',
            inlineDrawer: false,
            remoteContent: null,
            mainContentUrl: undefined,

            toggle(options) {
                this.open = !this.open;
                this.inlineDrawer = options.variant === "inline" || false;
                this.expanded = options.expanded ?? false;

                if (this.open && options.variant === undefined) {
                    document.body.classList.add("overflow-hidden");
                }

                if (options.mainContentUrl) {
                    fetch(options.mainContentUrl)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(res.statusText);
                            }
                            return res.text();
                        })
                        .then((res) => {
                            this.mainContent = res;
                            return res;
                        })
                        .catch((e) => {
                            console.error(e.message);
                            this.mainContent = "<p class='my-40 text-center text-zinc-600'>An error occurred while fetching content.</p>"
                            return null;
                        });
                }

                if (options.url) {
                    this.loading = true;
                    fetch(options.url)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(res.statusText);
                            }
                            return res.text();
                        })
                        .then((res) => {
                            this.remoteContent = res;
                            this.loading = false;
                            return res;
                        })
                        .catch((e) => {
                            this.loading = false;
                            console.error(e.message);
                            this.remoteContent = "<p class='my-40 text-center text-zinc-600'>An error occurred while fetching content.</p>"
                            return null;
                        });
                }

                // Cleanup code
                if (!this.open) {
                    this.expanded = false;
                    this.loading = false;
                    this.remoteContent = null;
                    this.mainContent = '';
                    this.mainContentUrl = undefined;
                    document.body.classList.remove("overflow-hidden");
                }
            },
        })
    );
};
