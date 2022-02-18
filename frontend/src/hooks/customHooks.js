import {useContext} from 'react';
import { SettingsContext } from '../context/settings_context/SettingState';

export const useSettings = () => {
    return useContext(SettingsContext);
}