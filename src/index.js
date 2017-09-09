"use strict";

import gnomeBackground from "icons/gnome/background.png"
import gnomeBluetooth from "icons/gnome/bluetooth.png"
import gnomeColor from "icons/gnome/color.png"
import gnomeDate from "icons/gnome/datetime.png"
import gnomeDisplay from "icons/gnome/displays.png"
import gnomeInfo from "icons/gnome/info.png"
import gnomeKeyboard from "icons/gnome/keyboard.png"
import gnomeMouse from "icons/gnome/mouse.png"
import gnomeNetwork from "icons/gnome/network.png"
import gnomeNotifications from "icons/gnome/notifications.png"
import gnomeAccounts from "icons/gnome/online-accounts.png"
import gnomePower from "icons/gnome/power.png"
import gnomePrinters from "icons/gnome/printers.png"
import gnomePrivacy from "icons/gnome/privacy.png"
import gnomeRegion from "icons/gnome/language.png"
import gnomeSearch from "icons/gnome/search.png"
import gnomeSharing from "icons/gnome/sharing.png"
import gnomeSound from "icons/gnome/sound.png"
import gnomeAccess from "icons/gnome/universal-access.png"
import gnomeUsers from "icons/gnome/users.png"
import gnomeWacom from "icons/gnome/wacom.png"

const { search, shellCommand } = require('cerebro-tools');

const COMMANDS = {
    gnome: {
        'Background': {
            command: "gnome-control-center background",
            icon: gnomeBackground,
            title: "Change background"
        },
        'Bluetooth': {
            command: "gnome-control-center bluetooth",
            icon: gnomeBluetooth,
            title: "Bluetooth settings"
        },
        'Color': {
            command: "gnome-control-center color",
            icon: gnomeColor,
            title: "Manage color profile"
        },
        'Datetime': {
            command: "gnome-control-center datetime",
            icon: gnomeDate,
            title: "Date & Time"
        },
        'Display': {
            command: "gnome-control-center display",
            icon: gnomeDisplay,
            title: "Change displays settings"
        },
        'Info': {
            command: "gnome-control-center info",
            icon: gnomeInfo,
            title: "Gnome Details"
        },
        'Keyboard': {
            command: "gnome-control-center keyboard",
            icon: gnomeKeyboard,
            title: "Keyboard shortcuts"
        },
        'Mouse': {
            command: "gnome-control-center mouse",
            icon: gnomeMouse,
            title: "Mouse & Touchpad"
        },
        'Network': {
            command: "gnome-control-center network",
            icon: gnomeNetwork,
            title: "Network settings"
        },
        'Notifications': {
            command: "gnome-control-center notifications",
            icon: gnomeNotifications,
            title: "Manage notifications settings"
        },
        'Online-accounts': {
            command: "gnome-control-center online-accounts",
            icon: gnomeAccounts,
            title: "Connect to your data in the cloud"
        },
        'Power': {
            command: "gnome-control-center power",
            icon: gnomePower,
            title: "Manage power settings"
        },
        'Printers': {
            command: "gnome-control-center printers",
            icon: gnomePrinters,
            title: "Manage your printers"
        },
        'Privacy': {
            command: "gnome-control-center privacy",
            icon: gnomePrivacy,
            title: "Manage your privacy settings"
        },
        'Region': {
            command: "gnome-control-center region",
            icon: gnomeRegion,
            title: "Region & Language"
        },
        'Search': {
            command: "gnome-control-center search",
            icon: gnomeSearch,
            title: "Manage search settings"
        },
        'Sharing': {
            command: "gnome-control-center sharing",
            icon: gnomeSharing,
            title: "Manage sharing settings"
        },
        'Sound': {
            command: "gnome-control-center sound",
            icon: gnomeSound,
            title: "Manage sound settings"
        },
        'Universal-access': {
            command: "gnome-control-center universal-access",
            icon: gnomeAccess,
            title: "Accessibility settings"
        },
        'User-accounts': {
            command: "gnome-control-center user-accounts",
            icon: gnomeUsers,
            title: "Users settings"
        },
        'Wacom': {
            command: "gnome-control-center wacom",
            icon: gnomeWacom,
            title: "Manage your Wacom devices"
        }
    }
};

// see https://askubuntu.com/questions/72549/how-to-determine-which-window-manager-is-running#answer-227669
const getDesktopEnvironment = () => {
    const desktop = process.env.XDG_CURRENT_DESKTOP
    const gdmSession = process.env.GDMSESSION;

    if (desktop === "Unity" && gdmSession.startsWith("ubuntu")) {
        return "unity";
    } else if (desktop === "XFCE" && gdmSession === "xfce") {
        return "xfce";
    } else if (desktop === "" && gdmSession === "kde-plasma") {
        return "kde";
    } else if (desktop === "GNOME" && gdmSession.startsWith("gnome")) {
        return "gnome";
    } else if (desktop === "GNOME" && gdmSession === "cinnamon") {
        return "cinnamon";
    } else if (desktop === "KDE" && gdmSession === "default") {
        return "kde";
    } else if (desktop === "X-Cinnamon" && (gdmSession === "default" || gdmSession === "cinnamon")) {
        return "cinnamon";
    } else if (desktop === "LXDE" && gdmSession === "Lubuntu") {
        return "lxde";
    }

    return "default";
};

// This function was taken from the cerebro-system-settings
const plugin = ({ term, display }) => {
    const OS = getDesktopEnvironment();
    const commands = search(Object.keys(COMMANDS[OS]), term);
    if (commands.length > 0) {
        const result = commands.map((cmd) => ({
            title: cmd,
            subtitle: COMMANDS[OS][cmd].title,
            term: cmd,
            icon: COMMANDS[OS][cmd].icon,
            onSelect: () => shellCommand(COMMANDS[OS][cmd].command)
        }));
        display(result);
    }
};

module.exports = {
    fn: plugin
};