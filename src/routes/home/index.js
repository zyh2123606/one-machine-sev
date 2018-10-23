import React, { Component } from 'react'
import Block from 'fs-flex'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile-rn'

class Home extends Component{
    static navigationOptions = {
        title: '首页',
        header: null
    }
    render(){
        return (
            <View style={Styles.container}>
                <Button type='primary'>确定</Button>
            </View>
        )
    }
}

export default connect(state => state)(Home)
const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})