import React from 'react'

export default () => {
    const [display, setDisplay] = React.useState<null | 'desktop' | 'mobile'>(null)

    React.useEffect(() => {
        setDisplaySize()

        const handleDisplaySize = () => {
            setDisplaySize()
        }

        window.addEventListener('resize', handleDisplaySize)

        return () => {
            window.removeEventListener('resize', handleDisplaySize)
        }
    }, [])


    const setDisplaySize = () => {
        if (window.innerWidth < 900) {
            setDisplay('mobile')
        } else {
            setDisplay('desktop')
        }
    }


    return { display, size: window.innerWidth }
}