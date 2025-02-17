import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useKeyboardVisibility } from '../../hooks/use-keyboard-visibility'
import { useReduxAction } from '../../hooks/use-redux-action'
import { useReduxState } from '../../hooks/use-redux-state'
import * as actions from '../../redux/actions'
import * as selectors from '../../redux/selectors'
import { contentPadding } from '../../styles/variables'
import { FAB } from '../common/FAB'
import { useColumnFilters } from '../context/ColumnFiltersContext'
import { AppLayoutProviderState, useAppLayout } from '../context/LayoutContext'
import { keyboardShortcutsById } from '../modals/KeyboardShortcutsModal'

export const fabSpacing = contentPadding / 2 // + Math.max(0, (fabSize - defaultButtonSize) / 2) - 2

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: fabSpacing,
    right: contentPadding,
    zIndex: 1000,
  },
})

export function shouldRenderFAB({
  isColumnFiltersVisible,
  keyboardVisibility,
  sizename,
}: {
  isColumnFiltersVisible?: boolean
  keyboardVisibility?: ReturnType<typeof useKeyboardVisibility>
  sizename: AppLayoutProviderState['sizename']
}) {
  if (!(sizename <= '3-large')) return false

  if (sizename === '1-small' && isColumnFiltersVisible) return false

  if (keyboardVisibility === 'appearing' || keyboardVisibility === 'visible')
    return false

  return true
}

export function FABRenderer() {
  // const addOrCloseAnimatedRef = useRef(new Animated.Value(0))

  const { isSharedFiltersOpened } = useColumnFilters()
  const { sizename } = useAppLayout()
  const keyboardVisibility = useKeyboardVisibility()
  const columnIds = useReduxState(selectors.columnIdsSelector)
  const currentOpenedModal = useReduxState(selectors.currentOpenedModal)
  const closeAllModals = useReduxAction(actions.closeAllModals)
  const replaceModal = useReduxAction(actions.replaceModal)

  if (
    !shouldRenderFAB({
      sizename,
      keyboardVisibility,
      isColumnFiltersVisible: isSharedFiltersOpened,
    })
  )
    return null

  if (!currentOpenedModal) {
    if (!columnIds.length) return null

    /*
    Animated.timing(addOrCloseAnimatedRef.current, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
    }).start()

    const rotateZ = addOrCloseAnimatedRef.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    })

    const iconStyle = { transform: [{ rotateZ }] }
    */

    // TODO: Migrate to react-spring
    // Bug: https://github.com/react-spring/react-spring/issues/437
    const iconStyle = undefined

    return (
      <View collapsable={false} style={styles.container}>
        <FAB
          key="fab"
          analyticsLabel="add_column"
          iconName="plus"
          iconStyle={iconStyle}
          onPress={() => replaceModal({ name: 'ADD_COLUMN' })}
          tooltip={`Add column (${keyboardShortcutsById.addColumn.keys[0]})`}
          useBrandColor
        />
      </View>
    )
  }

  switch (currentOpenedModal.name) {
    case 'ADD_COLUMN':
    case 'ADD_COLUMN_DETAILS': {
      /*
      Animated.timing(addOrCloseAnimatedRef.current, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      }).start()

      const rotateZ = addOrCloseAnimatedRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
      })

      const iconStyle = { transform: [{ rotateZ }] }
      */

      // TODO: Migrate to react-spring
      // Bug: https://github.com/react-spring/react-spring/issues/437
      const iconStyle = undefined

      return (
        <View style={styles.container}>
          <FAB
            analyticsLabel="close_modals"
            key="fab"
            iconName="x"
            iconStyle={iconStyle}
            onPress={() => closeAllModals()}
            tooltip={`Close (${keyboardShortcutsById.closeModal.keys[0]})`}
          />
        </View>
      )
    }

    default: {
      // addOrCloseAnimatedRef.current.setValue(0)
      return null
    }
  }
}
