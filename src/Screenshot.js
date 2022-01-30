import {useEffect, useState} from "react";

const parser = new DOMParser()

export const Screenshot = () => {
    const usedCodes = []
    const generateCode = () => {
        let result           = '';
        const characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (usedCodes.includes(result)) {
            return generateCode()
        } else {
            usedCodes.push(result)
            return result;
        }
    }

    const [code, setCode] = useState(generateCode())
    const [image, setImage] = useState("")
    const [link, setLink] = useState("")

    useEffect(async () => {
        const htmlFetched = await fetch(`https://prnt.sc/${code}`)
        const htmlParsed = await htmlFetched.text()
        const fetchedDOM = parser.parseFromString(htmlParsed, 'text/html')
        const fetchedImage = fetchedDOM.getElementById("screenshot-image")
        setLink(fetchedImage.src)
        try {
            // TODO: Check if link contains "removed"
            setImage(fetchedImage.src)
        } catch (e) {
            console.log()
        }

    }, [code])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <p>Code: {code}</p>
            <p>Link: <a href={image} target="_blank">{image}</a></p>
            <button onClick={() => setCode(generateCode())}>x</button>
            {link.includes("imgur") ? <img src={image} alt={""}/> :
            <iframe height={900} src={image} referrerPolicy="no-referrer" />}
        </div>
    )
}