import {useEffect, useState} from "react";
import type {RadioShow} from "../models/RadioShow.ts";
import {useNavigate} from "react-router-dom";
import {radioShowService} from "../services/radioShow.service.ts";

export const useRadioShowList = () => {
    const [shows, setShows] = useState<RadioShow[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        radioShowService.getRadioShows()
            .then(data => {
                setShows(data);
                setLoading(false);
            })
    }, []);

    const navigateToShow = (radioShow: RadioShow) => {
        navigate(`./${radioShow.id}`, {state: {radioShow}});
    }

    return { shows, loading, navigateToShow };
}