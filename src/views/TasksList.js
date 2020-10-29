import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet,
         Text, 
         View, 
         ImageBackground, 
         FlatList, 
         TouchableOpacity, 
         Alert } from 'react-native'

import appStyles from '../appStyles'
import todayImage from '../../assets/imgs/today.jpg'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/task'
import AddTask from './AddTask'

export default class TasksList extends Component {

    state = {
      showDoneTasks: true,
      showAddTask: false,
      visibleTasks: [],
      tasks: [
        {
          id: Math.random(),
          desc: "Concluir primeira parte do App",
          estimatedAt: new Date(),
          doneAt: new Date(),
        },
        {
          id: Math.random(),
          desc: "Terminar frila",
          estimatedAt: new Date(),
          doneAt: null,
        },
        {
          id: Math.random(),
          desc: "Finalizar cadastros",
          estimatedAt: new Date(),
          doneAt: null,
        },
        {
          id: Math.random(),
          desc: "Comprar sachê dos mimis",
          estimatedAt: new Date(),
          doneAt: null,
        }
      ]
    }

    componentDidMount = () => {
      this.filterTasks()
    }

    toggleTask = taskId => {
      const tasks = [...this.state.tasks]
      tasks.forEach(task => {
        if(task.id === taskId) {
          task.doneAt = task.doneAt ? null : new Date()
        }
      })

      this.setState( { tasks }, this.filterTasks)
    }

    toggleFilter =  () => {
      this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    filterTasks = () => {
      let visibleTasks = null
      if (this.state.showDoneTasks) {
        visibleTasks = [...this.state.tasks]
      } else {
        const pending = task => task.doneAt === null
        visibleTasks = this.state.tasks.filter(pending)
      }
      
      this.setState({ visibleTasks })
    }

    addTask = newTask => {
      if(!newTask.desc || !newTask.desc.trim()){
        Alert.alert('Informe uma tarefa a ser adicionada')
        return
      }

      let today = new Date()

      if(newTask.date < today ){
        Alert.alert('Não é possível adcionar tarefas no passado')
        return
      }

      const tasks = [...this.state.tasks]
      tasks.push({
        id: Math.random(),
        desc: newTask.desc,
        estimatedAt: newTask.date,
        doneAt: null
      })

      this.setState({ tasks, showAddTask: false}, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
              <AddTask isVisible={this.state.showAddTask}
                onCancel={() => this.setState( { showAddTask: false })}
                onSave={this.addTask}/>
                <ImageBackground style={styles.background} source={todayImage}>
                    <View style={styles.iconBar}>
                      <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={ this.state.showDoneTasks? 'eye' : 'eye-slash'}
                        size={20} color={appStyles.colors.secondary}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskslist}>
                  <FlatList data={this.state.visibleTasks} 
                  keyExtractor={item => `${item.id}`}
                  renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask}/>} />
                </View>
                <TouchableOpacity style={styles.addButton}
                  activeOpacity={0.7}
                  onPress={() => this.setState( { showAddTask: true })}>
                  <Icon name="plus" size={20} color={appStyles.colors.secondary}/>
                </TouchableOpacity>
                <StatusBar style="light" />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  background: {
    flexGrow: 3,
  },
  taskslist: {
    flexGrow: 7,
  },
  titleBar: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: appStyles.fontFamily,
    color: appStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20
  },
  subtitle: {
    fontFamily: appStyles.fontFamily,
    color: appStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  iconBar: {
    flexDirection: 'row',
    marginRight: 20,
    marginTop: 50,
    justifyContent: 'flex-end'
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  }  
})

//Caso precise alterar uma propriedade conforme o Sistema Operacional, usar Plataform.OS
//marginTop: Plataform.OS === 'ios? 30 : 10
