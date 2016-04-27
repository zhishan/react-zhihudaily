import React from 'react'
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import AboutDialog from '../components/AboutDialog'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/'

const AppBarIconMenu = ({
	handleClick,
	OPEN_ABOUT_DIALOG
}) => {
  	return (
	  <AppBar
	    title="知乎日报"
	    style={{position: 'fixed'}}
	    iconElementLeft={<IconButton onClick={handleClick}><ArrowBack /></IconButton>}
	    iconElementRight={
	      <IconMenu
	        iconButtonElement={
	          <IconButton><MoreVertIcon /></IconButton>
	        }
	        targetOrigin={{horizontal: 'right', vertical: 'top'}}
	        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
	        <MenuItem primaryText="About" onTouchTap={OPEN_ABOUT_DIALOG} />
	      </IconMenu>
	    }/>
	)
}

class Header extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.handleClickBtn = this.handleClickBtn.bind(this)
	}
	handleClickBtn() {
		this.context.router.goBack()
	}
	render() {
		return (
			<header>
				<AppBarIconMenu
					style={{position: 'fixed'}}
					handleClick={this.handleClickBtn}
					{...this.props.actions}
				/>

				<AboutDialog
					open={this.props.UIState.isDialogOpen}
					{...this.props.actions}
				/>
			</header>
		)
	}
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UIState: state.UIState
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)