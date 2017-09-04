"use strict";

const { search, shellCommand } = require('cerebro-tools');

const COMMANDS = {
	gnome: {
		'Background': {
			command: "gnome-control-center backgrouns",
		},
		'Bluetooth': {
			command: "gnome-control-center bluetooth",
		},
		'Color': {
			command: "gnome-control-center color",
		},
		'Datetime': {
			command: "gnome-control-center datetime",
		},
		'Display': {
			command: "gnome-control-center display",
		},
		'Info': {
			command: "gnome-control-center info",
		},
		'Keyboard': {
			command: "gnome-control-center keyboard",
		},
		'Mouse': {
			command: "gnome-control-center mouse",
		},
		'Network': {
			command: "gnome-control-center network",
		},
		'Notifications': {
			command: "gnome-control-center notifications",
		},
		'Online-accounts': {
			command: "gnome-control-center online-accounts",
		},
		'Power': {
			command: "gnome-control-center power",
		},
		'Printers': {
			command: "gnome-control-center printers",
		},
		'Privacy': {
			command: "gnome-control-center privacy",
		},
		'Region': {
			command: "gnome-control-center region",
		},
		'Search': {
			command: "gnome-control-center search",
		},
		'Sharing': {
			command: "gnome-control-center sharing",
		},
		'Sound': {
			command: "gnome-control-center sound",
		},
		'Universal-access': {
			command: "gnome-control-center universal-access",
		},
		'User-accounts': {
			command: "gnome-control-center user-accounts",
		},
		'Wacom': {
			command: "gnome-control-center wacom",
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
      subtitle: COMMANDS[OS][cmd].subtitle,
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
