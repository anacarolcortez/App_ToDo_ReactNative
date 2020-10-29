import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import appStyles from '../appStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNot = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formatedDate = moment(date).locale('pt-br').format('ddd D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContaier}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={styles.desc, doneOrNot}>{props.desc}</Text>
                <Text style={styles.subText}>{formatedDate}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null){
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending} />
        )
    }
    
}

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaaaaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContaier: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: appStyles.fontFamily,
        color: appStyles.colors.mainText,
        fontSize: 18
    },
    date: {
        fontFamily: appStyles.fontFamily,
        color: appStyles.colors.subText,
        fontSize: 16,
    }
})