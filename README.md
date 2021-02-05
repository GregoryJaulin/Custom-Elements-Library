# Custom Elements Library
Sometimes we may need to add to a project something that has already been developed before. To avoid copying and pasting code, I have created this repository compiling some custom elements I've been developing for others projects. Feel free to use or to modify them as you want to fit your needs.

:warning: Components in this repository are using [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Shadow DOM isn't supported by all browser. I do not recommend you using them in production.

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)

### Installation
I've made two different ways to use those custom elements depending on your needs. 
For both, you first have to choose whatever component (or group of components) you need and put the corresponding file into your project directory, wherever you want.

Files ending with `-AI.js` means that they will auto define custom elements with a predefined tag name. Don't take such files if you want to use custom tag name.

*Notice that I've grouped similar elements in a single file, and also made a one-component per file version depending on your needs.
I recommend using grouped files if you are planning to use several similar elements.*

---

**Then**, you have to load it into your `.html` file like whatever javascript file, for example :
```html
<script src="./components/skeletons-AI.js"></script>
```

---

**If you choose a file ending with `-AI.js`**, it's supposed to work fine like that.
**Otherwise** you will have to define the selected element :

1. Into the previously created script tag, import the component : 
```Javascript
import Skeleton_Txt from './components/skeleton-txt.js'
```

*Notice that if you choose file grouping multiple components, you can just load those required using {} :* 
```Javascript
import { Skeleton_Txt, Skeleton_Img } from './components/skeletons.js'
```

2. Then, you will have to tell the browser which name each custom element will use as tag. To do so, just add
```Javascript
customElements.define("my-tag-name", Skeleton_Txt)
```

**:warning: Custom tag name require using at least one `-`, otherwise it wont work.**

### Usage

Once custom element loaded into your `.html` file and declared if needed, you can add them directly into your page. Some components accept or requires attributes to work fine, they will be listed below.
* [Skeletons_Txt](#Skeleton_Txt)
* [Skeletons_Img](#Skeleton_Img)

All components has a `attachedmodeopen` attribute. It accept only two different values (`true` or `false`). Default value is `true`.<br>
Setting it up at `true` will allow your component to be accessed using external Javascript

---

#### Skeleton_Txt

Default tag name -> `skeleton-txt`

| Attribute Name | Type | Default | Allowed Values |
| :------------: | :------------: | :------------: | :------------: |
| type | String | `text` | `text`, `title`, `subtitle` |
| height | Number / String | `.5em` if type == `subtitle`, else `1em` | All CSS Units allowed |
| width | Number / String | `100%` | All CSS Units allowed |
| lines | Number | `1` | Whatever number you want |
| text-align | String | `left` | `left`, `center`, `right` |

---

#### Skeleton_Img

Default tag name -> `skeleton-img`

| Attribute Name | Type | Default | Allowed Values |
| :------------: | :------------: | :------------: | :------------: |
| height (required) | Number / String | `0px` | All CSS Units allowed |
| width (required) | Number / String | `0px` | All CSS Units allowed |