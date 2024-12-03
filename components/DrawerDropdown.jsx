import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { icons } from "../constants"; // Ensure `icons.contact` is properly imported

const SECTIONS = [
  {
    title: "Contact Us",
    content: {
      label: "Facebook",
      url: "https://www.facebook.com/share/62SDmSX3gdaJ7fjH/",
    },
    content2: {
      label: "Instagram",
      url: "https://www.instagram.com/onehomeph?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    },
  },
];

class DrawerDropdown extends Component {
  state = { activeSections: [] };

  _renderHeader = (section) => (
    <View style={styles.header}>
      <Image source={icons.contact} style={styles.icon} />
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  _renderContent = (section) => (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => Linking.openURL(section.content.url)}>
        <View className="flex-row">
          <Image source={icons.facebook} className="w-[30] h-[30]" />
          <Text style={styles.link}>{section.content.label}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(section.content2.url)} className="mt-5">
        <View className="flex-row">
          <Image source={icons.instagram} className="w-[30] h-[30]" />
          <Text style={styles.link}>{section.content2.label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  _updateSections = (activeSections) => this.setState({ activeSections });

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    padding: 10,
    backgroundColor: "#ffffff",
    marginLeft: 10,
  },
  link: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default DrawerDropdown;
