import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Studio} from "../models/Studio.ts";
import {studioService} from "../services/studio.service.ts";

export const useStudioList = () => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        studioService.getStudios()
            .then(data => {
                setStudios(data);
                setLoading(false);
            })
    }, []);

    const navigateToStudio = (studio: Studio) => {
        navigate(`./${studio.id}`, {state: {studio}});
    }

    return { studios, loading, navigateToStudio };
}