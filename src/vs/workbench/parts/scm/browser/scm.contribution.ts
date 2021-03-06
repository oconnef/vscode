/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { localize } from 'vs/nls';
import { Registry } from 'vs/platform/platform';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from 'vs/workbench/common/contributions';
import { DirtyDiffDecorator } from './dirtydiffDecorator';
import { ViewletRegistry, Extensions as ViewletExtensions, ViewletDescriptor, ToggleViewletAction } from 'vs/workbench/browser/viewlet';
import { VIEWLET_ID } from 'vs/workbench/parts/scm/common/scm';
import { IWorkbenchActionRegistry, Extensions as WorkbenchActionExtensions } from 'vs/workbench/common/actionRegistry';
import { KeyMod, KeyCode } from 'vs/base/common/keyCodes';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { IViewletService } from 'vs/workbench/services/viewlet/browser/viewlet';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution(DirtyDiffDecorator);

const viewletDescriptor = new ViewletDescriptor(
	'vs/workbench/parts/scm/browser/scmViewlet',
	'SCMViewlet',
	VIEWLET_ID,
	localize('scm', "SCM"),
	'scm',
	36
);

Registry.as<ViewletRegistry>(ViewletExtensions.Viewlets)
	.registerViewlet(viewletDescriptor);

class OpenSCMViewletAction extends ToggleViewletAction {
	public static ID = VIEWLET_ID;
	public static LABEL = localize('toggleGitViewlet', "Show Git");

	constructor(id: string, label: string, @IViewletService viewletService: IViewletService, @IWorkbenchEditorService editorService: IWorkbenchEditorService) {
		super(id, label, VIEWLET_ID, viewletService, editorService);
	}
}

// Register Action to Open Viewlet
Registry.as<IWorkbenchActionRegistry>(WorkbenchActionExtensions.WorkbenchActions).registerWorkbenchAction(
	new SyncActionDescriptor(OpenSCMViewletAction, VIEWLET_ID, localize('toggleSCMViewlet', "Show SCM"), {
		primary: null,
		win: { primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_G },
		linux: { primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_G },
		mac: { primary: KeyMod.WinCtrl | KeyMod.Shift | KeyCode.KEY_G }
	}),
	'View: Show SCM',
	localize('view', "View")
);