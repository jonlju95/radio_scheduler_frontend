import {useEffect, useState} from "react";
import type {RadioHost} from "../models/RadioHost.ts";
import {useNavigate} from "react-router-dom";
import {radioHostService} from "../services/radioHost.service.ts";

export const useRadioHostList = () => {
    const [hosts, setHosts] = useState<RadioHost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        radioHostService.getRadioHosts()
            .then(data => {
                setHosts(data);
                setLoading(false);
            })
    }, []);

    const navigateToHost = (radioHost: RadioHost) => {
        navigate(`./${radioHost.id}`, {state: {radioHost}});
    }

    return { hosts, loading, navigateToHost };
}