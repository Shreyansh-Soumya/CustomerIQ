export function predictCluster(income, spending, model) {

    // Standardize input using Python's scaler values
    const scaledInput = [
      (income - model.mean[0]) / model.scale[0],
      (spending - model.mean[1]) / model.scale[1]
    ];
  
    let nearestCluster = -1;
    let minimumDistance = Infinity;
  
    // Calculate Euclidean distance from every centroid
    model.centroids.forEach((centroid, index) => {
  
      const distance = Math.sqrt(
        Math.pow(scaledInput[0] - centroid[0], 2) +
        Math.pow(scaledInput[1] - centroid[1], 2)
      );
  
      if (distance < minimumDistance) {
        minimumDistance = distance;
        nearestCluster = index;
      }
  
    });
  
    return nearestCluster;
  }