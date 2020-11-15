import React from 'react';
import marked from 'marked';
import './App.css';

const renderer = new marked.Renderer();
// link style
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
}
// heading style
renderer.heading = function (text, level) {
    if (level == 1)
        return `<h${level}>${text}</h${level}><hr style="border:1px solid black;"><br>`;
    else if (level == 2)
        return `<h${level}>${text}</h${level}><hr><br>`;
    else
        return `<h${level}>${text}</h${level}>`;
}
  
  
marked.use({ renderer });

const DEFAULT_INPUT = "# Welcome to my React Markdown Previewer!\n\
\n\
## This is a sub-heading...\n\
### And here's some other cool stuff:\n\
\n\
Heres some code, `<div></div>`, between 2 backticks.\n\
\n\
```\n\
// this is multi-line code:\n\
\n\
function anotherExample(firstLine, lastLine) {\n\
if (firstLine == '```' && lastLine == '```') {\n\
    return multiLineCode;\n\
}\n\
}\n\
```\n\
\n\
You can also make text **bold**... whoa!\n\
Or _italic_.\n\
Or... wait for it... **_both!_**\n\
And feel free to go crazy ~~crossing stuff out~~.\n\
\n\
There's also [links](https://www.freecodecamp.com), and block quote\n\
> Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.\n\
\n\
And if you want to get really crazy, even tables:\n\
\n\
Wild Header | Crazy Header | Another Header?\n\
------------ | ------------- | -------------\n\
Your content can | be here, and it | can be here....\n\
And here. | Okay. | I think we get it.\n\
\n\
- And of course there are lists.\n\
- Some are bulleted.\n\
    - With different indentation levels.\n\
        - That look like this.\n\
\n\
\n\
1. And there are numbererd lists too.\n\
1. Use just 1s if you want!\n\
1. And last but not least, let's not forget embedded images:\n\
\n\
![React Logo w/ Text](https://goo.gl/Umyytc)";
  
const Editor = (props) => {
    return (
        <div className="editor-box">
        <div className="editor-title">
            <h2>{props.title}</h2>
        </div>
        <div className="editor-content">
            <textarea id={props.id} type="textarea" onChange={props.onChange} 
            value={props.value}/>
        </div>
        </div>
    )
}
  
  
const Viewer = (props) => {
    return (
        <div className="editor-box">
        <div className="editor-title">
            <h2>{props.title}</h2>
        </div>
        <div className="editor-content">
            <div id="preview" className="preview-content" dangerouslySetInnerHTML={{__html: props.text}} >
            </div>
        </div>
        </div>
    )
}
  
export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            input: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    // load default text
    componentDidMount() {
        this.setState({
            input: DEFAULT_INPUT
        });
    }
    
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    
    render() {
        const marked_text = marked(this.state.input);
        return (
            <div className="container">
                <div className="editor-wrapper">
                <Editor id="editor" title="Editor" onChange={this.handleChange} 
                    value={this.state.input}/>
                </div>
                <div className="preview-wrapper">
                <Viewer id="preview" title="Previewer" text={marked_text}></Viewer>
                </div>
            </div>
        )
    }
}
