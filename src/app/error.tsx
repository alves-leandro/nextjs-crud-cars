'use client'

import { Button } from "@chakra-ui/react";
import { useEffect } from "react"

interface ErrorProps {
    error: Error,
    reset: () => void
}

export default function Error({error, reset}:ErrorProps) {
    useEffect(() => {
        console.log(error);
        
    }, [error])

    return (
        <>
            <h1>Sua página deu erro</h1>
            <Button type="button" onClick={reset}>tentar novamente</Button>
        </>
    )
}