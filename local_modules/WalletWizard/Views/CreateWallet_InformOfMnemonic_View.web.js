// Copyright (c) 2014-2017, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"
//
const commonComponents_forms = require('../../WalletAppCommonComponents/forms.web')
const commonComponents_navigationBarButtons = require('../../WalletAppCommonComponents/navigationBarButtons.web')
//
const AddWallet_Wizard_ScreenBaseView = require('./AddWallet_Wizard_ScreenBaseView.web')
//
class CreateWallet_InformOfMnemonic_View extends AddWallet_Wizard_ScreenBaseView
{
	_setup_views()
	{
		const self = this
		super._setup_views()
		{
			const text = "Write down your mnemonic"
			const layer = self._new_messages_subheaderLayer(text)
			layer.style.marginTop = "36px"
			layer.style.textAlign = "center"
			layer.style.wordBreak = "break-word"
			self.layer.appendChild(layer)
		}
		{
			const text = "You'll confirm this sequence on the next&nbsp;screen."
			const layer = self._new_messages_paragraphLayer(text)
			layer.style.marginBottom = "40px"
			layer.style.textAlign = "center"
			layer.style.wordBreak = "break-word"
			self.layer.appendChild(layer)
		}
		{
			const layer = document.createElement("div")
			layer.style.background = "#1d1b1d"
			layer.style.boxShadow = "inset 0 1px 0 0 #161416, 0 .5px 0 0 rgba(56,54,56, .5)"
			layer.style.width = `calc(100% - ${2*16}px - ${2*24}px)`
			layer.style.borderRadius = "5px"
			layer.style.padding = "36px 24px"
			layer.style.margin = "0 auto 23px auto"
			layer.style.wordBreak = "break-word"
			layer.style.lineHeight = "22px"
			layer.style.fontSize = "13px"
			layer.style.webkitUserSelect = "all" // allow selection here
			layer.style.fontFamily = "monospace" // TODO
			// TODO: get from wizard controller wallet
			layer.innerHTML = "intergalactic planetary boys beasty style profile worth your while brass monkey funky monkey"
			self.layer.appendChild(layer)
		}
		{
			const layer = document.createElement("div")
			layer.style.background = "rgba(245,230,125,0.05)"
			layer.style.boxShadow = "0 0 0 0 rgba(56,54,56,0.50), inset 0 0 0 0 #161416"
			layer.style.width = `calc(100% - ${2*(16+1)}px - ${2*10}px)` // +1 because of border
			layer.style.borderRadius = "5px"
			layer.style.border = "1px solid rgba(245,230,125,0.30)"
			layer.style.padding = "6px 8px 7px 8px"
			layer.style.margin = "0 auto 40px auto" // footer padding
			layer.style.fontWeight = "300"
			layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
			layer.style.fontSize = "11px"
			layer.style.wordBreak = "break-word"
			layer.style.color = "#f5e67e"
			const text = "NOTE: This is the only way to access your wallet if you switch computers, use another Monero wallet app, or lose your&nbsp;data."
			layer.innerHTML = text
			self.layer.appendChild(layer)
		}
	}
	_setup_startObserving()
	{
		const self = this
		super._setup_startObserving()
	}
	//
	//
	// Lifecycle - Teardown
	//
	TearDown()
	{
		const self = this
		super.TearDown()
	}
	//
	//
	// Runtime - Accessors - Factories
	//
	_new_messages_subheaderLayer(contentString)
	{
		const self = this
		const layer = document.createElement("h3")
		layer.innerHTML = contentString
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontSize = "13px"
		layer.style.lineHeight = "20px"
		layer.style.fontWeight = "500"
		layer.style.color = "#F8F7F8"
		layer.style.marginTop = "24px"
		layer.style.textAlign = "center"
		return layer
	}
	_new_messages_paragraphLayer(contentString)
	{
		const self = this
		const layer = document.createElement("p")
		layer.innerHTML = contentString
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontWeight = "normal"
		layer.style.fontSize = "13px"
		layer.style.color = "#8D8B8D"
		layer.style.lineHeight = "20px"
		return layer
	}
	//
	//
	// Runtime - Accessors - Navigation
	//
	Navigation_Title()
	{
		return "New Wallet"
	}
	Navigation_New_RightBarButtonView()
	{
		const self = this
		const view = commonComponents_navigationBarButtons.New_RightSide_SaveButtonView(self.context)
		self.rightBarButtonView = view
		const layer = view.layer
		layer.innerHTML = "Next"
		layer.addEventListener(
			"click",
			function(e)
			{
				e.preventDefault()
				{
					if (self.isSubmitButtonDisabled !== true) { // button is enabled
						self._userSelectedNextButton()
					}
				}
				return false
			}
		)
		return view
	}
	//
	//
	// Runtime - Delegation - Navigation View special methods
	//
	navigationView_viewIsBeingPoppedFrom()
	{
		const self = this
		// I don't always get popped but when I do I maintain correct state
		self.wizardController.PatchToDifferentWizardTaskMode_withoutPushingScreen(
			self.options.wizardController_current_wizardTaskModeName, 
			self.options.wizardController_current_wizardTaskMode_stepIdx - 1
		)
	}
}
module.exports = CreateWallet_InformOfMnemonic_View