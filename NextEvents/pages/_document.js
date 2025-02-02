import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDuocument extends Document{
    render(){
        return(
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlays"/>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDuocument
