import AppSheet from "../ui/AppSheet";
import SheetActions from "../ui/SheetActions";

const ConfirmDeleteSheet = ({
    deleteSheetRef,
    processing,
    actionToTake,
    question,
    title = "Are you sure?",
    confirmText = "Move to Recycle bin",
}: {
    deleteSheetRef: any;
    processing: boolean;
    actionToTake: () => void;
    question: string;
    title?: string;
    confirmText?: string;
}) => (
    <AppSheet ref={deleteSheetRef} title={title} description={question.trim()}>
        <SheetActions
            onCancel={() => deleteSheetRef.current?.close()}
            onConfirm={actionToTake}
            confirmLabel={confirmText}
            loading={processing}
            danger
        />
    </AppSheet>
);

export default ConfirmDeleteSheet;
