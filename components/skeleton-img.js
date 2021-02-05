function $parseDimension(dim, maximize = false) {
    if(!dim) return maximize ? '100%' : 'auto'
    if(dim.match(/^[0-9]+$/)) dim += 'px'

    return dim
}

export default class Skeleton_Img extends HTMLElement {

    static get observedAttributes() { return ['height', 'width']; }

    constructor() {
        super()

        this.root = this.attachShadow({ mode: !this.hasAttribute("attachedmodeopen") || this.getAttribute("attachedmodeopen") == 'true' ? 'open' : "closed" })
    }

    $setContent() {
        const dimensions = {
            height: $parseDimension(this.getAttribute("height") || '0px'),
            width: $parseDimension(this.getAttribute("width") || '0px')
        }

        this.root.innerHTML = /*html*/
        `<style>
            span {
                position: relative;
                display: block;
                
                height: ${dimensions.height};
                width: ${dimensions.width};
                border-radius: ${Math.min(parseInt(dimensions.height, 10), parseInt(dimensions.width, 10)) * 7.5 / 100}px;

                overflow: hidden;
                background: var(--skeleton-bg, rgba(0, 0, 0, .1));
            }

            span::after {
                content: '';
                position: absolute;
                top: 0; left: 0;

                height: 100%;
                width: 100%;

                background: linear-gradient(90deg, transparent, var(--skeleton-wave, rgba(0, 0, 0, .12)), transparent);

                transform: translateX(-150%);
                animation: wave 2s infinite;
            }

            @keyframes wave {
                from { transform: translateX(-150%); }
                80% { transform: translateX(150%); }
                to { transform: translateX(150%); }
            }
        </style>
        <span></span>`
    }

    connectedCallback() { this.$setContent() }
    attributeChangedCallback() { this.$setContent() }

}