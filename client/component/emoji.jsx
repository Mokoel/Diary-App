import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import { Entypo } from '@expo/vector-icons'; 
import { ContentContext } from '../context/context';
function EmojiComponent({ onEmoji }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [emojiPreview, setEmojiPreview] = useState(null);
    const contentCtx =  useContext(ContentContext);


    return (
        <View>
            <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
                <Text style={styles.emojiText}>{contentCtx?.emojiPreview !== null ? contentCtx.emojiPreview  :<Entypo name="emoji-happy" size={50} color="grey" />}</Text>
            </Pressable>
            <Modal
                visible={modalVisible}
            >
                <View style={styles.modalBox}>
                    <EmojiSelector
                        style={styles.emojiBox}
                        placeholder="더 많은 이모티콘을 검색해보세요."
                        columns={7}
                        showTabs={false}
                        category={Categories.emotion}
                        showSearchBar={true}
                        onEmojiSelected={(emoji) => {
                            console.log(emoji);
                            setModalVisible(false);
                            onEmoji(emoji); 
                            contentCtx?.setEmojiPreview(emoji);
                        }}
                    />
                </View>
            </Modal>
        </View>);
}

const styles = StyleSheet.create({
    emojiBox: {
        flex: 1,
        backgroundColor: "#fff",
    },
    emojiText: {
        fontSize: 50,
        textAlign: "center",
    },
    modalBox: {
        flex: 1,
        padding: 35,
        marginVertical: 70,
    }
});

export default EmojiComponent;