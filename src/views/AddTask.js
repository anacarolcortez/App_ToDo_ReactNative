import React, { Component } from 'react'
import { Modal, 
        View, 
        Text, 
        StyleSheet, 
        TouchableWithoutFeedback,
        TextInput,
        TouchableOpacity,
        Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import appStyles from '../appStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state ={
        ...initialState
    }

    save = ()  => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        if (this.props.onSave) {
            this.props.onSave(newTask)
        }
        
        this.setState( { ...initialState })
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
            value={this.state.date}
            onChange={(_, date) => this.setState({date : !date ? new Date() : date, showDatePicker: false })}
            mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState( { showDatePicker: true })}>
                        <Text style={styles.date}>
                        {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                
                <View style={styles.overlay}>

                    <View style={styles.container}>
                        <Text style={ styles.header}>Nova Tarefa</Text>
                        <TextInput style={styles.input} placeholder="Descreva a tarefa pendente"
                            onChangeText={desc => this.setState({ desc })}
                            value={this.state.desc}/>
                            {this.getDatePicker()}
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        height: 300
    },
    header: {
        fontFamily: appStyles.fontFamily,
        backgroundColor: appStyles.colors.today,
        color: appStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: appStyles.fontFamily,
        height: 40,
        margin: 15,
        marginTop: 30,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: appStyles.colors.today
    },
    date: {
        fontFamily: appStyles.fontFamily,
        fontSize: 18,
        margin: 15
    }
})