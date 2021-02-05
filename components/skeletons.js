function $parseDimension(dim, maximize = false) {
    if(!dim) return maximize ? '100%' : 'auto'
    if(dim.match(/^[0-9]+$/)) dim += 'px'

    return dim
}

class Skeleton_Base extends HTMLElement {

    constructor() {
        super()

        this.root = this.attachShadow({ mode: !this.hasAttribute("attachedmodeopen") || this.getAttribute("attachedmodeopen") == 'true' ? 'open' : "closed" })

        this.animation_style = `
            @keyframes wave {
                from { transform: translateX(-150%); }
                80% { transform: translateX(150%); }
                to { transform: translateX(150%); }
            }`
    }

    $setContent() {}

    connectedCallback() { this.$setContent() }
    attributeChangedCallback() { this.$setContent() }
}

class Skeleton_Txt extends Skeleton_Base {

    static get observedAttributes() { return ['height', 'width', 'lines']; }

    constructor() {
        super()
    }

    $getOffset(align) {
        switch(align) {
            case 'center': return "center"
            case 'right': return "flex-end"
            default: return "flex-start"
        }
    }

    $setContent() {
        const type = this.getAttribute("type") || "text"
        const dimensions = {
            height: $parseDimension(this.getAttribute("height") || type === 'subtitle' ? '.5em' : '1em'),
            width: $parseDimension(this.getAttribute("width"), true)
        }
        const lines = parseInt(this.getAttribute("lines") || 1, 10)
        const align = this.$getOffset(this.getAttribute("txt-align") || 'left')
        
        let spans = `<span></span>`
        for(let i = 1; i < lines; i++) {
            spans += `<span></span>`
        }

        this.root.innerHTML = /*html*/
        `<style>
            :host { display: block; }

            div {
                display: flex;
                flex-direction: column;
                align-items: ${align};

                margin: .75em 0;
            }

            span {
                position: relative;
                display: block;

                height: ${dimensions.height};
                width: ${dimensions.width};
                margin: .15em 0;
                border-radius: 5px;
                color: transparent;

                overflow: hidden;
                background: var(--skeleton-bg, rgba(0, 0, 0, .1));

                ${type === 'text' ? 'transform: scale(1, .75);' : ''}
            }

            span:last-child { width: ${lines !== 1 ? 'calc(' + (.3 + Math.random() * .4) + ' * ' + dimensions.width + ')' : dimensions.width}; }

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

            ${this.animation_style}
        </style>
        ${lines > 1 ? '<div>' + spans + '</div>' : spans}`
    }
}

class Skeleton_Img extends Skeleton_Base {

    static get observedAttributes() { return ['height', 'width']; }

    constructor() {
        super()
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

            ${this.animation_style}
        </style>
        <span></span>`
    }

}

export {
    Skeleton_Txt,
    Skeleton_Img
}