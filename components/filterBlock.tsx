import FilterView from "@constants/filter";
import { SafeAreaView, ViewStyle } from "react-native";

const FilterBlock = ({ filter, setFilter }) => {

    const styles = {
        filterBlock: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: 10,
        } as ViewStyle
    };

    return (
        <SafeAreaView style={styles.filterBlock}>
            <FilterView
                onPress={() => setFilter("all")}
                active={filter === "all"}
                title="All"
                color="#000"
            />
            <FilterView
                onPress={() => setFilter("active")}
                active={filter === "active"}
                title="Active"
                color="#00f"
            />
            <FilterView
                onPress={() => setFilter("completed")}
                active={filter === "completed"}
                title="Completed"
                color="#0f0"
            />
        </SafeAreaView>
    );
};

export default FilterBlock;
